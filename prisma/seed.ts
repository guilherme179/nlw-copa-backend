import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@email.com',
			avatarUrl: 'https://github.com/guilherme179.png'
		}
	})

	const pool = await prisma.pool.create({
		data: {
			title: 'Example Pool',
			code: 'BOL123',
			ownerId: user.id,
			
            participant: {
                create: {
                    userId: user.id
                }
            }
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-05T14:30:00.114Z',
			firstTeamCountryCode: 'AR',
			secondTeamCountryCode: 'UY',
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-06T15:00:00.114Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'FR',
			guesses: {
				create: {
					firstTeamPoints: 3,
                    secondTeamPoints: 1,
					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id
							}
						}
					}
				}
			}
		}
	})

}

main()