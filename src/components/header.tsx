import {
  Header as FableHeader,
  MainBar,
  MainBarLogo,
  MainBarAppName,
  MainBarNavigation,
  NavigationList,
  NavigationListItem,
  HeaderSkipLink
} from '@sainsburys-tech/fable'
import { User } from '@sainsburys-tech/icons'
import Link from 'next/link'

export default function Header() {
  return (
    <FableHeader>
      <HeaderSkipLink href="#maincontent">Skip to main content</HeaderSkipLink>
      <MainBar>
        <MainBarLogo brand="sainsburys" as={Link} href="/" />
        <MainBarAppName>Ticketing</MainBarAppName>
        <MainBarNavigation>
          <NavigationList style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <NavigationListItem as={Link} href="/admin">
              Admin
            </NavigationListItem>
            <NavigationListItem as={Link} href="/profile" style={{ marginLeft: 'auto' }}>
              <User aria-label="User Profile" style={{ width: '24px', height: '24px' }} />
            </NavigationListItem>
          </NavigationList>
        </MainBarNavigation>
      </MainBar>
    </FableHeader>
  )
}
