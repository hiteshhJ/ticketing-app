import { auth, signOut } from '@/auth'
import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Alert, Display6 } from '@sainsburys-tech/fable'
import { Blocked, InfoCircle } from '@sainsburys-tech/icons'

export const metadata: Metadata = { title: 'Example | Ticketing' }

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

const Example = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <>
      <Alert leadingIcon={<InfoCircle />} status="warning" label='This is an example page to show a logged in landing page that can be accessed only after logging in. This
        is controlled in the middleware. It shows how to access user information from the session and display it on the
        page.' />
      <Display6 as="h1" className="fable:mt-1 fable:mb-2">Example</Display6>

      {user ? (
        <>
          <SignOutButton />
          <ul>
            <li>
              <strong>UserId: </strong>
              <span>{user.id}</span>
            </li>
            <li>
              <strong>Email: </strong>
              <span>{user.email}</span>
            </li>
            <li>
              <strong>Name: </strong>
              <span>{user.name}</span>
            </li>
            {user.image && (
              <li>
                <strong>Image: </strong>
                <Image width={32} height={32} alt="user image" src={user.image}></Image>
              </li>
            )}
          </ul>
        </>
      ) : (
        <Alert status="error" label="No user information found" leadingIcon={<Blocked />} />
      )}
    </>
  )
}

export default Example
