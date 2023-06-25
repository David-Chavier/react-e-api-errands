export type ErrandsTypes = {
  userId: string;
  description: string;
  details?: string;
  errandId: string;
};
export type CreateErrandTypes = Omit<ErrandsTypes, 'errandId'>;
export type UpdateErrandtypes = { userId: string; description?: string; details?: string; errandId: string };

export type DeleleErrandTypes = Omit<UpdateErrandtypes, 'description' | 'details'>;
