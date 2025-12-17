import { auth, signOut } from '@/auth'
import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Alert, Box } from '@sainsburys-tech/fable'
import { Blocked } from '@sainsburys-tech/icons'

export const metadata: Metadata = { title: 'User Profile | Ticketing' }

function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  )
}

const ProfilePage = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '30px' }}>User Profile</h1>

      {user ? (
        <Box 
          backgroundColor="secondary" 
          style={{ 
            padding: '40px', 
            borderRadius: '8px', 
            maxWidth: '500px', 
            width: '100%',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}
        >
          {user.image && (
            <Box style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <Image 
                width={120} 
                height={120} 
                alt="user image" 
                src={user.image}
                style={{ borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
            </Box>
          )}
          
          <Box style={{ marginBottom: '30px', textAlign: 'left' }}>
            <Box style={{ marginBottom: '15px' }}>
              <strong style={{ display: 'block', marginBottom: '5px', color: '#374151', fontSize: '14px' }}>Name</strong>
              <span style={{ fontSize: '16px' }}>{user.name || 'N/A'}</span>
            </Box>
            
            <Box style={{ marginBottom: '15px' }}>
              <strong style={{ display: 'block', marginBottom: '5px', color: '#374151', fontSize: '14px' }}>Email</strong>
              <span style={{ fontSize: '16px' }}>{user.email || 'N/A'}</span>
            </Box>
            
            {user.id && (
              <Box style={{ marginBottom: '15px' }}>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#374151', fontSize: '14px' }}>User ID</strong>
                <span style={{ fontSize: '16px' }}>{user.id}</span>
              </Box>
            )}
          </Box>

          <SignOutButton />
        </Box>
      ) : (
        <Alert status="error" label="No user information found" leadingIcon={<Blocked />} />
      )}
    </Box>
  )
}

export default ProfilePage
