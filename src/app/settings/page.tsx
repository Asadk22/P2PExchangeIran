import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select a category from the sidebar to manage your settings.
        </p>
      </div>
    </div>
  )
}
