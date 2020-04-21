import { Party, Role } from "./roles";

interface Player {
    id: number,
    name: string,
    role: Role,
    party: Party,
    seat: number,
    dead: boolean
}

export { Player }
