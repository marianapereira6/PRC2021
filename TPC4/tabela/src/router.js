import principal from './components/principal'
import Grupos from './components/grupos'
import Elementos from './components/elementos'
import Periodos from './components/periodos'

export default [
    {path: '/',component: principal,},
    {path: '/elementos',component: Elementos },
    {path: '/grupos',component: Grupos},
    {path: '/periodos',component: Periodos} 
]