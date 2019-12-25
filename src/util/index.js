import { connect } from 'react-redux'
import noop from 'lodash/noop'
import moment from 'moment'

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 * @param  {...any} funcs The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

/**
 * Middleware for react-redux connect
 *
 * @param component
 * @param mapState
 * @param mapDispatch
 */
export const composeContainer = (
  component,
  mapStateToProps,
  mapDispatchToProps = noop(),
) => compose(
  connect(mapStateToProps, mapDispatchToProps),
)(component)

/**
 * Whether a date was in the past
 * @param {moment.Moment} current
 */
export const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current <= moment().endOf('day')
}
