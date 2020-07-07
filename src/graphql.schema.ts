/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateCatInput {
  name?: string
  age?: number
}

export interface Cat {
  id?: number
  name?: string
  age?: number
}

export interface IMutation {
  createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>
}

export interface IQuery {
  getCats(): Cat[] | Promise<Cat[]>
  cat(id: string): Cat | Promise<Cat>
}

export interface ISubscription {
  catCreated(): Cat | Promise<Cat>
}
