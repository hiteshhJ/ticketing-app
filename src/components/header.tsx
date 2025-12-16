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

import Link from 'next/link'

export default function Header() {
  return (
    <FableHeader>
      <HeaderSkipLink href="#maincontent">Skip to main content</HeaderSkipLink>
      <MainBar>
        <MainBarLogo brand="sainsburys" as={Link} href="/" />
        <MainBarAppName>Ticketing</MainBarAppName>
        <MainBarNavigation>
          <NavigationList>
            <NavigationListItem as={Link} href="/example">
              Authentication Example
            </NavigationListItem>
            <NavigationListItem as={Link} href="/admin">
              Admin
            </NavigationListItem>
          </NavigationList>
        </MainBarNavigation>
      </MainBar>
    </FableHeader>
  )
}
