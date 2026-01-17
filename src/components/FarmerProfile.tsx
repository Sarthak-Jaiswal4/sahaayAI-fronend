import { useFarmerStore } from '@/store/useFarmerStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Globe, Accessibility } from 'lucide-react';

/**
 * FarmerProfile Component
 * 
 * Example component that uses the Zustand farmer store to display
 * and manage farmer information.
 * 
 * This demonstrates:
 * - Reading farmer data from the store
 * - Checking authentication status
 * - Logging out
 */
export function FarmerProfile() {
    const { farmer, isAuthenticated, logout } = useFarmerStore();

    if (!isAuthenticated || !farmer) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                        Please sign in to view your profile
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Farmer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Username</p>
                        <p className="font-medium">{farmer.username}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{farmer.email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">
                            {farmer.countryCode} {farmer.phoneNumber}
                        </p>
                    </div>
                </div>

                {farmer.languagePreference && (
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Language</p>
                            <p className="font-medium">{farmer.languagePreference}</p>
                        </div>
                    </div>
                )}

                {farmer.answerPreference && (
                    <div className="flex items-center gap-3">
                        <Accessibility className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Answer Preference</p>
                            <p className="font-medium capitalize">{farmer.answerPreference}</p>
                        </div>
                    </div>
                )}

                {farmer.lastLoginAt && (
                    <div className="pt-4 border-t">
                        <p className="text-xs text-muted-foreground">
                            Last login: {new Date(farmer.lastLoginAt).toLocaleString()}
                        </p>
                    </div>
                )}

                <Button
                    onClick={logout}
                    variant="destructive"
                    className="w-full mt-4"
                >
                    Logout
                </Button>
            </CardContent>
        </Card>
    );
}
