import { FrontSizes, BackSizes } from "../../../../models/custom.sizes"

export const frontSizes: (keyof FrontSizes)[] = [
    'Neck Depth',
    'Sleeve Length',
    'Shirt Length',
    'Bust Circumference',
    'Waist',
    'Hip Circumference',
    'Thigh Circumference',
    'Knee Circumference',
    'Calf Circumference',
    'Ankle',
]

export const backSizes: (keyof BackSizes)[] = [
    'Back Neck Depth',
    'Cross Shoulder',
    'Trouser Length',
    'Armhole',
    'Bicep',
]
