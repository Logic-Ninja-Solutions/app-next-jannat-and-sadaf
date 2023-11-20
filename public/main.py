import numpy as np
import cv2 as cv

image = cv.imread('./logo-cropped.jpeg')

# Make a copy of the original image
copied_image = image.copy()

# Set the threshold for black pixels
lower_black = np.array([0, 0, 0], dtype=np.uint8)
upper_black = np.array([50, 50, 50], dtype=np.uint8)

# Create a binary mask where black pixels are within the specified range
black_mask = cv.inRange(copied_image, lower_black, upper_black)

# Set the black pixels to white in the copied image
copied_image[black_mask > 0] = [255, 255, 255]

# Save the result
cv.imwrite('logo-cropped-white.jpeg', copied_image)
