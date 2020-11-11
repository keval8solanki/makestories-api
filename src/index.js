require('./configs/env')

const { constants: { PORT } } = require('./constants')

const app = require("./configs/app")
const auth_route = require('./routes/auth_route')
const user_route = require('./routes/user_route')

app.use(auth_route)
app.use(user_route)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))