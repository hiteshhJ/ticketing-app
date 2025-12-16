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
        <MainBarAppName>Web Application Template</MainBarAppName>
        <MainBarNavigation>
          <NavigationList>
            <NavigationListItem as={Link} href="/example" isActive>
              Authentication Example
            </NavigationListItem>
          </NavigationList>
        </MainBarNavigation>
      </MainBar>
    </FableHeader>
  )
}
