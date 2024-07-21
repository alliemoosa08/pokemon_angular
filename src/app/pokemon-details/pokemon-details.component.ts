import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsService } from '../api';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {
  pokemomID!: number
  PokemonDetailsData: any = {}

  constructor(private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemomID = +params.get('id')!;
    })

    this.pokemonsService.getPokemonByID(this.pokemomID)
    .subscribe({
      next: (detailsData: any) =>{
        this.PokemonDetailsData = detailsData
      }, error: error =>{
        throw error
      }
    })
  }

  viewPokemonList(){
    this.router.navigate(["/home"])
  }
}
