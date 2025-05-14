import LoginForm from '@/app/(auth)/login/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Or{' '}
            <a href="/register" className="font-medium text-black hover:text-neutral-800">
              create a new account
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
} 