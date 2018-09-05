import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

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

        it('should call deleteHero with correct hero', () => {
            component.delete(heroes[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
        })
    })
})

describe('HeroesComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    let heroes;
    
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
      })
      class FakeHeroComponent {
        @Input() hero: Hero;
      }

    beforeEach(() => { 
        heroes = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent    
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        })

        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})