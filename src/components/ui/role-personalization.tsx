"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Code, TrendingUp, Settings, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type UserRole = 'recruiter' | 'developer' | 'manager' | 'general'

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  isPersonalized: boolean
  setPersonalized: (personalized: boolean) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    // Return default values for SSR
    return {
      role: 'general' as UserRole,
      setRole: () => {},
      isPersonalized: false,
      setPersonalized: () => {}
    }
  }
  return context
}

interface RoleProviderProps {
  children: ReactNode
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [role, setRole] = useState<UserRole>('general')
  const [isPersonalized, setPersonalized] = useState(false)
  const [hasSelectedRole, setHasSelectedRole] = useState(false)

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('portfolio-user-role') as UserRole
    const savedPersonalization = localStorage.getItem('portfolio-personalized') === 'true'
    const savedSelection = localStorage.getItem('portfolio-role-selected') === 'true'
    
    if (savedRole && savedSelection) {
      setRole(savedRole)
      setPersonalized(savedPersonalization)
      setHasSelectedRole(true)
    }
  }, [])

  // Save role to localStorage when changed
  useEffect(() => {
    if (hasSelectedRole) {
      localStorage.setItem('portfolio-user-role', role)
      localStorage.setItem('portfolio-personalized', isPersonalized.toString())
      localStorage.setItem('portfolio-role-selected', 'true')
    }
  }, [role, isPersonalized, hasSelectedRole])

  const handleRoleSelect = (newRole: UserRole, personalized: boolean = true) => {
    setRole(newRole)
    setPersonalized(personalized)
    setHasSelectedRole(true)
  }

  return (
    <RoleContext.Provider value={{ role, setRole, isPersonalized, setPersonalized }}>
      {children}
      {!hasSelectedRole && <RoleSelector onRoleSelect={handleRoleSelect} />}
    </RoleContext.Provider>
  )
}

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole, personalized: boolean) => void
}

function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [step, setStep] = useState<'intro' | 'selection' | 'confirmation'>('intro')

  const roles = [
    {
      id: 'recruiter' as UserRole,
      title: 'Recruiter',
      icon: Users,
      description: 'Focus on skills, experience, and hiring potential',
      features: ['Executive summaries', 'Skills matrix', 'Experience timeline', 'Resume download'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'developer' as UserRole,
      title: 'Developer',
      icon: Code,
      description: 'Deep dive into technical implementation and code quality',
      features: ['Technical deep dives', 'Code samples', 'Architecture diagrams', 'Live demos'],
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200'
    },
    {
      id: 'manager' as UserRole,
      title: 'Manager',
      icon: TrendingUp,
      description: 'Business impact, team collaboration, and project outcomes',
      features: ['Business metrics', 'Team leadership', 'Project ROI', 'Process improvements'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200'
    }
  ]

  const handleContinue = () => {
    if (step === 'intro') {
      setStep('selection')
    } else if (step === 'selection' && selectedRole) {
      setStep('confirmation')
    }
  }

  const handleConfirm = (personalized: boolean) => {
    if (selectedRole) {
      onRoleSelect(selectedRole, personalized)
    }
  }

  const handleSkip = () => {
    onRoleSelect('general', false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
        >
          {step === 'intro' && (
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to My Portfolio</h2>
                <p className="text-muted-foreground">
                  I can personalize your experience based on what you&apos;re looking for. 
                  This takes just 30 seconds and makes the content more relevant to you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {roles.map((role) => (
                  <div key={role.id} className="text-center">
                    <div className={`w-12 h-12 rounded-lg ${role.bgColor} flex items-center justify-center mx-auto mb-2`}>
                      <role.icon className={`h-6 w-6 ${role.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm">{role.title}</h3>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={handleContinue} size="lg">
                  Let&apos;s Personalize
                </Button>
                <Button onClick={handleSkip} variant="ghost" size="lg">
                  Skip for Now
                </Button>
              </div>
            </div>
          )}

          {step === 'selection' && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">What brings you here?</h2>
                <p className="text-muted-foreground">
                  Choose the option that best describes your interest. I&apos;ll customize the content accordingly.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === role.id
                        ? `${role.bgColor} border-current`
                        : 'border-border hover:border-border/60 bg-card hover:bg-muted/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${selectedRole === role.id ? 'bg-white/20' : role.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <role.icon className={`h-6 w-6 ${role.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{role.title}</h3>
                          {selectedRole === role.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {role.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3 justify-end">
                <Button onClick={() => setStep('intro')} variant="ghost">
                  Back
                </Button>
                <Button onClick={handleContinue} disabled={!selectedRole}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 'confirmation' && selectedRole && (
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Perfect!</h2>
                <p className="text-muted-foreground">
                  I&apos;ve customized the experience for <strong>{roles.find(r => r.id === selectedRole)?.title.toLowerCase()}s</strong>. 
                  You&apos;ll see relevant content, metrics, and features prioritized for your needs.
                </p>
              </div>

              <Card className="mb-8 text-left">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">What You&apos;ll See</CardTitle>
                  <CardDescription>Personalized content includes:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {roles.find(r => r.id === selectedRole)?.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-3 justify-center">
                <Button onClick={() => handleConfirm(true)} size="lg">
                  Start Personalized Tour
                </Button>
                <Button onClick={() => handleConfirm(false)} variant="ghost" size="lg">
                  Browse Without Personalization
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                You can change this anytime using Cmd+K → &quot;Switch Role&quot;
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Role-based content wrapper
interface RoleContentProps {
  role: UserRole | UserRole[]
  children: ReactNode
  fallback?: ReactNode
}

export function RoleContent({ role, children, fallback }: RoleContentProps) {
  const { role: currentRole, isPersonalized } = useRole()
  
  if (!isPersonalized) return <>{children}</>
  
  const allowedRoles = Array.isArray(role) ? role : [role]
  const shouldShow = allowedRoles.includes(currentRole)
  
  return shouldShow ? <>{children}</> : <>{fallback || null}</>
}

// Role-specific badge component
export function RoleBadge() {
  const { role, isPersonalized } = useRole()
  
  if (!isPersonalized || role === 'general') return null
  
  const roleConfig = {
    recruiter: { label: 'Recruiter View', color: 'bg-blue-100 text-blue-800' },
    developer: { label: 'Developer View', color: 'bg-green-100 text-green-800' },
    manager: { label: 'Manager View', color: 'bg-purple-100 text-purple-800' }
  }
  
  const config = roleConfig[role]
  if (!config) return null
  
  return (
    <Badge className={`${config.color} text-xs`}>
      {config.label}
    </Badge>
  )
}