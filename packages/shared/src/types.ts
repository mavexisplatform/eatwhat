export type SessionMode = 'individual' | 'couple' | 'group'
export type SessionStatus = 'pending' | 'active' | 'voting' | 'completed'
export type HouseMode = 'strict' | 'chill'

export interface Restaurant {
  id: string; name: string; address: string
  lat: number; lng: number; rating?: number; distance?: number
}

export interface Session {
  id: string; mode: SessionMode; status: SessionStatus
  creatorId: string; houseMode?: HouseMode
  context?: any; candidates?: Restaurant[]
  houseOverride: boolean; createdAt: string; expiresAt: string
}