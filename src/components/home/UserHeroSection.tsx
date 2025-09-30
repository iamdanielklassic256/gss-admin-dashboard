import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/stores/authStore"

const UserHeroSection = () => {
  const { user, } = useAuthStore()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="relative">
      <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 border-none">
        <div className="absolute inset-0 bg-black/10" />
        <CardContent className="relative z-10 p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="text-white mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <h1 className="text-3xl font-bold">
                    {getGreeting()}, {user?.name || 'Admin'}! 👋
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserHeroSection