import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { of } from "rxjs/observable/of";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let heroes;
    let mockHeroService;

    beforeEach(() => {
        heroes = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        mockHeroService.deleteHero.and.returnValue(of(true));

        component = new HeroesComponent(mockHeroService);
        component.heroes = heroes;
    })

    describe('delete', () => {
        
        it('should remove the indicated hero from the heroes list', () => {
            component.delete(heroes[2]);

            expect(component.heroes.length).toBe(2);
            expect(component.heroes[0]).toBe(component.heroes[0]);
            expect(component.heroes[1]).toBe(component.heroes[1]);
        })

        it('should call deleteHero', () => {
            component.delete(heroes[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
        })
    })

})