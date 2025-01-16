import { Card, CardContent } from "@/components/ui/card"

interface HeaderComponentPromp {
  screenName: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
}

export default function HeaderComponent({ screenName, description, Icon }: HeaderComponentPromp) {
  return (
    <Card className="w-full my-4 h-32">
      <CardContent className="flex items-center space-x-4 p-6">
        {Icon && <Icon className="h-12 w-12 text-primary" aria-hidden="true" />} 
        <div>
          <h2 className="text-2xl font-bold">{screenName}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
