import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { adminLogin } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input as InputField } from '@/components/ui/input'
import { Label as LabelField } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await adminLogin(password)
      navigate('/admin')
    } catch {
      setError('Invalid password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Lock className="size-5" />
            </span>
            <h1 className="mt-4 font-serif text-2xl text-foreground">GIDITA Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your store</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <LabelField htmlFor="password">Password</LabelField>
              <InputField
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Default password: <code className="font-mono">gidita2025</code>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
