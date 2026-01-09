"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, User as UserIcon, Shield, Crown, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { getUsers, updateUserRole, User } from "@/lib/data/users"
import { useTranslation } from 'react-i18next'

export default function AdminAccountsPage() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState("")
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return

    try {
      setUpdating(true)
      const updatedUser = await updateUserRole(selectedUser.id, newRole)
      setUsers(users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ))
      setSelectedUser(null)
      setNewRole("")
    } catch (error) {
      console.error("Error updating role:", error)
    } finally {
      setUpdating(false)
    }
  }

  const getRoleBadge = (user: User) => {
    const primaryRole = user.roles?.[0]?.toLowerCase() || 'user'

    if (primaryRole === 'admin') return <Badge variant="destructive"><Crown className="h-3 w-3 mr-1" />Admin</Badge>
    if (primaryRole === 'approved') return <Badge variant="default"><Shield className="h-3 w-3 mr-1" />Approved</Badge>
    return <Badge variant="secondary"><UserIcon className="h-3 w-3 mr-1" />Regular</Badge>
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{t('admin.accounts.title')}</h1>
          <p className="text-muted-foreground">{t('admin.accounts.description')}</p>
        </div>

        {/* All Users */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.accounts.allUsers')} ({filteredUsers.length})</CardTitle>
            <CardDescription>{t('admin.accounts.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('admin.accounts.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.accounts.user')}</TableHead>
                    <TableHead>{t('admin.accounts.role')}</TableHead>
                    <TableHead>{t('admin.accounts.joined')}</TableHead>
                    <TableHead>{t('admin.accounts.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        {t('admin.accounts.loading')}
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        {t('admin.accounts.noUsersFound')}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user)}</TableCell>
                        <TableCell>
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                {t('admin.accounts.changeRole')}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t('admin.accounts.changeRoleTitle')}</DialogTitle>
                                <DialogDescription>
                                  {t('admin.accounts.changeRoleDescription')} {user.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">{t('admin.accounts.newRole')}</label>
                                  <Select value={newRole} onValueChange={setNewRole}>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t('admin.accounts.selectRole')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="USER">{t('admin.accounts.regularUser')}</SelectItem>
                                      <SelectItem value="ADMIN">{t('admin.accounts.admin')}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedUser(null)
                                    setNewRole("")
                                  }}
                                >
                                  {t('admin.accounts.cancel')}
                                </Button>
                                <Button
                                  onClick={() => {
                                    setSelectedUser(user)
                                    handleUpdateRole()
                                  }}
                                  disabled={updating || !newRole}
                                >
                                  {updating ? t('admin.accounts.updating') : t('admin.accounts.updateRole')}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
