import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

interface Pokemon {
  name: string;
  imageUrl: string;
  id: number;
}

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatIconModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit {
  PokemonList: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchText = "";
  constructor(private pokemonServe: PokemonsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemonServe.getPokemons().subscribe({
      next: (response: any) => {
        this.getPokemonInfor(response);
      }, error: error => {
        throw error
      }
    })

    this.filterItems();
  }

  getPokemonInfor(list: any) {
    const fetchPromises = list.map((item: any) =>
      fetch(item.url)
        .then(response => response.json())
        .then((pokeData: any) => ({
          name: pokeData.name,
          imageUrl: pokeData.sprites.front_default,
          id: pokeData.id
        }))
        .catch(error => {
          console.log('Error fetching Pokémon data:', error);
          return null; // Return null for errors to filter out later
        })
    );

    Promise.all(fetchPromises).then(results => {
      this.PokemonList = results.filter(pokemon => pokemon !== null);
      this.filteredPokemons = results.filter(pokemon => pokemon !== null);
     });
  }

  viewDetails(pokemonID: number){
    this.router.navigate(["/details",pokemonID])
  }

  filterItems() {
    let keywords: any;

    keywords = this.searchText.toLowerCase().split(' ');

    if (keywords.length === 0 || keywords[0] === '') {
      this.PokemonList = this.filteredPokemons;
      return;
    }

    this.PokemonList = this.filteredPokemons.filter(respData => {
      return keywords.some((keyword:any) =>
        respData.name.toLowerCase().includes(keyword) ||
        respData.name.toLowerCase().includes(keyword) ||
        respData.name.toLowerCase().includes(keyword)
      );
    });
  }
}
