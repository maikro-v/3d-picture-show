import error from './module/error'
import app from './module/app'
import main from './module/main'

export default [
  ...main,
  ...error,
  ...app
]
