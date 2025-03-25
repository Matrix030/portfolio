import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Tv2 } from "lucide-react"

interface SeveranceUIPortfolioCardProps {
  demoPath?: string
  className?: string
}

export const SeveranceUIPortfolioCard: React.FC<SeveranceUIPortfolioCardProps> = ({
  demoPath = "/severance-demo",
  className = "",
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Severance UI</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Tv2 size={14} />
            <span>TV Show Recreation</span>
          </Badge>
        </div>
        <CardDescription>A recreation of the Macrodata Refinement interface from Severance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-slate-900 rounded-md flex items-center justify-center mb-4">
          <div className="text-cyan-400 font-mono text-center">
            <div className="text-2xl mb-2">MACRODATA</div>
            <div className="text-sm">REFINEMENT</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          An interactive recreation of the mysterious data refinement interface seen in the Apple TV+ show Severance,
          built with Next.js and p5.js.
        </p>
      </CardContent>
      <CardFooter>
        <Link href={demoPath} className="w-full">
          <Button variant="default" className="w-full flex items-center gap-2">
            <span>Try the Demo</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default SeveranceUIPortfolioCard

