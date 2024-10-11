import { AbilityContext } from '../core/ability/AbilityContext';
import { StatefulPromptType } from '../core/gameSteps/StatefulPromptInterfaces';
import { GameSystem } from '../core/gameSystem/GameSystem';
import { DamageSystem } from './DamageSystem';
import { DistributeAmongTargetsSystem, IDistributeAmongTargetsSystemProperties } from './DistributeAmongTargetsSystem';
import { HealSystem } from './HealSystem';

export type IDistributeDamageSystemProperties<TContext extends AbilityContext = AbilityContext> = Omit<IDistributeAmongTargetsSystemProperties<TContext>, 'effectType'>;

/**
 * System for distributing damage among target cards.
 * Will prompt the user to select where to put the damage (unless auto-selecting a single target is possible).
 */
export class DistributeDamageSystem<TContext extends AbilityContext = AbilityContext> extends DistributeAmongTargetsSystem<TContext> {
    public override readonly name = 'distributeDamage';

    public override promptType = StatefulPromptType.DistributeDamage;

    protected override generateEffectSystem(amount = 1): DamageSystem | HealSystem {
        return new DamageSystem({ amount });
    }

    // most "distribute damage" abilities require all damage to be dealt
    protected override canDistributeLessDefault(): boolean {
        return false;
    }
}
