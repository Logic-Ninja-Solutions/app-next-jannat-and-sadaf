export interface FrontSizes {
    'Neck Path': string
    'Sleeve Length': string
    'Shirt Length': string
    'Bust Circumference': string
    Waist: string
    'Hip Circumference': string
    'Thigh Circumference': string
    'Knee Circumference': string
    'Calf Circumference': string
    Ankle: string
}

export interface BackSizes {
    'Back Next Depth': string
    'Cross Shoulder': string
    'Trouser Length': string
    Armhole: string
    Bicep: string
}

export type CustomSizes = FrontSizes & BackSizes
