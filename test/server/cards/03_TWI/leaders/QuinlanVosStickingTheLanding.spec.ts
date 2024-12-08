describe('Quinlan Vos, Sticking the Landing', function () {
    integration(function (contextRef) {
        it('Quinlan Vos\'s leader undeployed ability should deal 1 damage to an enemy unit that costs the same as the played unit', function () {
            contextRef.setupTest({
                phase: 'action',
                player1: {
                    hand: ['battlefield-marine'],
                    groundArena: ['lothal-insurgent'],
                    leader: 'quinlan-vos#sticking-the-landing',
                },
                player2: {
                    groundArena: ['wampa', 'specforce-soldier'],
                    spaceArena: ['green-squadron-awing']
                },
            });

            const { context } = contextRef;

            // play a 2-cost unit
            context.player1.clickCard(context.battlefieldMarine);

            // can pass this trigger
            expect(context.player1).toHavePassAbilityPrompt('Exhaust this leader');
            context.player1.clickPrompt('Exhaust this leader');

            // should deal 1 damage to a 2-cost enemy unit
            expect(context.player2).toBeActivePlayer();
            expect(context.greenSquadronAwing.damage).toBe(1);
            expect(context.quinlanVos.exhausted).toBeTrue();
        });

        it('Quinlan Vos\'s leader deployed ability should deal 1 damage to an enemy unit that costs the same as the played unit', function () {
            contextRef.setupTest({
                phase: 'action',
                player1: {
                    hand: ['battlefield-marine', 'desperado-freighter'],
                    groundArena: ['lothal-insurgent'],
                    leader: { card: 'quinlan-vos#sticking-the-landing', deployed: true },
                },
                player2: {
                    groundArena: ['wampa', 'specforce-soldier'],
                    spaceArena: ['green-squadron-awing']
                },
            });

            const { context } = contextRef;

            // play a 2-cost unit
            context.player1.clickCard(context.battlefieldMarine);

            // should deal damage to an enemy unit with a cost equal or less than 2
            expect(context.player1).toBeAbleToSelectExactly([context.specforceSoldier, context.greenSquadronAwing]);
            context.player1.clickCard(context.greenSquadronAwing);

            expect(context.player2).toBeActivePlayer();
            expect(context.greenSquadronAwing.damage).toBe(1);

            context.player2.passAction();

            // exhaust quinlan
            context.player1.clickCard(context.quinlanVos);
            context.player1.clickCard(context.p2Base);

            context.player2.passAction();

            // play a 5-cost unit
            context.player1.clickCard(context.desperadoFreighter);

            // should deal damage to an enemy unit with a cost equal or less than 5
            expect(context.player1).toBeAbleToSelectExactly([context.specforceSoldier, context.greenSquadronAwing, context.wampa]);
            context.player1.clickCard(context.wampa);

            expect(context.player2).toBeActivePlayer();
            expect(context.wampa.damage).toBe(1);
        });
    });
});