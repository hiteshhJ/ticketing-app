import { render } from '@testing-library/react'
import Counter from './counter.client'
import { useAction } from 'next-safe-action/hooks'

jest.mock('@/actions/counter', () => ({
  saveCounterValue: jest.fn(),
}))

describe('Counter', () => {
  test('should render the counter component', () => {
    ;(useAction as jest.Mock).mockReturnValue({
      executeAsync: jest.fn(),
      hasErrored: false,
      hasSucceeded: false,
      result: {},
    })
    const { container } = render(<Counter defaultValue={0} />)
    expect(container).toMatchSnapshot()
  })

  test('should call executeAsync when save button is clicked', () => {
    const executeAsync = jest.fn()
    ;(useAction as jest.Mock).mockReturnValue({
      executeAsync,
      hasErrored: false,
      hasSucceeded: false,
      result: {},
    })
    const { getByText } = render(<Counter defaultValue={5} />)
    getByText('Call server side action').click()
    expect(executeAsync).toHaveBeenCalledWith({ value: 5 })
  })

  test('should show error message when hasErrored is true', () => {
    ;(useAction as jest.Mock).mockReturnValue({
      executeAsync: jest.fn(),
      hasErrored: true,
      hasSucceeded: false,
      result: {},
    })
    const { getByText } = render(<Counter defaultValue={0} />)
    expect(getByText('HasErrored: true')).toBeInTheDocument()
  })
})
