import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownUp, ArrowDown, ArrowUp, GraduationCap, LogOut, RefreshCw, Search,
  Trash2, Inbox, Phone, Mail, User, Clock, BookOpen,
} from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { formatDate } from '@/lib/formatters';

const ROLE_LABEL = { phu_huynh: 'Phụ huynh', gia_su: 'Gia sư' };
const ROLE_STYLE = {
  phu_huynh: 'bg-[hsl(254,82%,92%)] text-[hsl(254,82%,40%)]',
  gia_su: 'bg-[hsl(168,70%,90%)] text-[hsl(168,70%,30%)]',
};

const COLUMNS = [
  { key: 'full_name', label: 'Họ và tên', icon: User },
  { key: 'phone', label: 'Số điện thoại', icon: Phone },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'role', label: 'Vai trò', icon: GraduationCap },
  { key: 'subject', label: 'Môn / lớp', icon: BookOpen },
  { key: 'created', label: 'Thời gian gửi', icon: Clock },
];

export default function AdminRequestsPage() {
  const { user, isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('created');
  const [sortDir, setSortDir] = useState('desc');
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const list = await pb.collection('contact_requests').getFullList({ sort: '-created' });
      setRecords(list);
    } catch (err) {
      setError('Không thể tải danh sách yêu cầu. Vui lòng đăng nhập lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthed) {
      navigate('/login', { replace: true });
      return;
    }
    load();
  }, [isAuthed]);

  // Realtime: keep the list in sync with new / updated / deleted requests.
  useEffect(() => {
    if (!isAuthed) return;
    void pb
      .collection('contact_requests')
      .subscribe('*', (e) => {
        setRecords((prev) => {
          if (e.action === 'create') return [e.record, ...prev];
          if (e.action === 'update') return prev.map((r) => (r.id === e.record.id ? e.record : r));
          if (e.action === 'delete') return prev.filter((r) => r.id !== e.record.id);
          return prev;
        });
      })
      .catch(() => {});
    return () => {
      void pb.collection('contact_requests').unsubscribe('*').catch(() => {});
    };
  }, [isAuthed]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = records;
    if (q) {
      rows = rows.filter((r) =>
        [r.full_name, r.phone, r.email, r.subject, r.message, ROLE_LABEL[r.role] || '']
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      if (sortKey === 'created') {
        return (new Date(av).getTime() - new Date(bv).getTime()) * dir;
      }
      return String(av).localeCompare(String(bv), 'vi') * dir;
    });
  }, [records, query, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await pb.collection('contact_requests').delete(toDelete.id);
      setRecords((prev) => prev.filter((r) => r.id !== toDelete.id));
      setToDelete(null);
    } catch (err) {
      setError('Xoá yêu cầu thất bại.');
    } finally {
      setDeleting(false);
    }
  };

  const onLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowDownUp className="h-3.5 w-3.5 opacity-30" />;
    return sortDir === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />;
  };

  return (
    <div className="min-h-[100dvh] bg-[hsl(250,40%,97%)]">
      <Helmet>
        <title>Quản lý yêu cầu — Gia sư Kết nối</title>
        <meta name="description" content="Bảng quản trị xem, tìm kiếm, sắp xếp và xoá các yêu cầu liên hệ và đăng ký gia sư." />
      </Helmet>

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(254,82%,60%)] to-[hsl(205,90%,55%)] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold text-foreground">Quản lý yêu cầu</p>
              <p className="text-xs text-muted-foreground">Gia sư Kết nối — Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-1.5">
              <LogOut className="h-4 w-4" /> Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Danh sách yêu cầu</h1>
            <p className="text-sm text-muted-foreground">
              {loading ? 'Đang tải…' : `${filtered.length} yêu cầu`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo tên, SĐT, email, nội dung…"
                className="w-full pl-9 sm:w-72"
              />
            </div>
            <Button variant="outline" size="icon" onClick={load} title="Tải lại">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
            {error}
          </div>
        )}

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-10 text-center">#</TableHead>
                    {COLUMNS.map((col) => (
                      <TableHead key={col.key} className="whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => toggleSort(col.key)}
                          className="inline-flex items-center gap-1.5 font-semibold text-foreground/80 transition hover:text-foreground"
                        >
                          {col.label}
                          <SortIcon col={col.key} />
                        </button>
                      </TableHead>
                    ))}
                    <TableHead className="min-w-[220px]">Nội dung yêu cầu</TableHead>
                    <TableHead className="w-12 text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading &&
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={`sk-${i}`}>
                        <TableCell colSpan={9}>
                          <Skeleton className="h-8 w-full" />
                        </TableCell>
                      </TableRow>
                    ))}

                  {!loading && filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="py-16">
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                          <Inbox className="h-10 w-10 opacity-40" />
                          <p className="font-medium">Chưa có yêu cầu nào</p>
                          <p className="text-sm">
                            Các yêu cầu liên hệ từ trang chủ sẽ hiển thị tại đây.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {!loading &&
                    filtered.map((r, idx) => (
                      <TableRow key={r.id} className="align-top">
                        <TableCell className="text-center text-sm text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {r.full_name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <a href={`tel:${r.phone}`} className="text-foreground hover:text-primary">
                            {r.phone}
                          </a>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {r.email ? (
                            <a href={`mailto:${r.email}`} className="text-primary hover:underline">
                              {r.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`font-medium ${ROLE_STYLE[r.role] || ''}`}>
                            {ROLE_LABEL[r.role] || r.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-foreground/80">
                          {r.subject || <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {r.created ? formatDate(new Date(r.created)) : '—'}
                        </TableCell>
                        <TableCell className="max-w-[260px]">
                          <p className="line-clamp-3 text-sm text-foreground/75">
                            {r.message || <span className="text-muted-foreground">—</span>}
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => setToDelete(r)}
                            title="Xoá yêu cầu"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-xs text-muted-foreground">
          Nhấp vào tiêu đề cột để sắp xếp. Danh sách tự động cập nhật khi có yêu cầu mới.
        </p>
      </main>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá yêu cầu này?</AlertDialogTitle>
            <AlertDialogDescription>
              Yêu cầu của <strong>{toDelete?.full_name}</strong> sẽ bị xoá vĩnh viễn và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Đang xoá…' : 'Xoá'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}