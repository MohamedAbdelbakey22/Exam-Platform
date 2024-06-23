import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user.js';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: User[], term: string): User[]{
    return users?.filter(user=>user.nationalPerson?.includes(term)|| user.name?.toLowerCase().includes(term.toLowerCase())) ;
  }

}
