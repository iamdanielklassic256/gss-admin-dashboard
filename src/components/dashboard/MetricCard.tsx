import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  description?: string
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  className 
}: MetricCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden bg-gradient-card shadow-card border-0 transition-all duration-200 hover:shadow-elevated",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {value}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {trend && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-md",
              trend.isPositive 
                ? "text-success bg-success-muted" 
                : "text-destructive bg-red-50"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}