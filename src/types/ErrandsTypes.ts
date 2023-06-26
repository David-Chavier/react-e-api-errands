export type ErrandsTypes = {
  userId: string;
  description: string;
  details?: string;
  errandId: string;
  isArchived: string;
};
export type CreateErrandTypes = Omit<ErrandsTypes, 'errandId'>;
export type UpdateErrandtypes = {
  userId: string;
  description?: string;
  details?: string;
  errandId: string;
  isArchived: string;
  archive: string;
};

export type DeleleErrandTypes = Omit<UpdateErrandtypes, 'description' | 'details' | 'isArchived' | 'archive'>;
