export class TooManyCategories extends Error {
  constructor() {
    super('Categories limit exceeded.')
  }
}
