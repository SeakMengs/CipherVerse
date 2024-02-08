import numpy as np  
import cv2

from textencryption import decrypt_function, encrypt_function

c1_prim = -0.1843137254901961
c2_prim = 0.8823529411764706
y1 = 0.123
y2 = -0.987

img = cv2.imread("./playground/images/plain_image/fight back to school 02.jpg") #Find the img

img_flatten = img.ravel() #make the image look decent

encrypt_img_flatten = encrypt_function(c1_prim, c2_prim, y1, y2, img_flatten) #Encrypt for the img value

encrypt_img = np.reshape(encrypt_img_flatten,img.shape) #Turn to picture 

cv2.imwrite("./playground/images/encrypt_image/newencryptedimg1.png",encrypt_img) #Save it

encrypt_img_check = cv2.imread("playground/images/encrypt_image/newencryptedimg1.png") #Find the encrypt img

encrypt_img_check_flatten = encrypt_img_check.ravel() #Get value of the encrypt img

decrypt_img_flatten = decrypt_function(c1_prim, c2_prim, y1, y2,encrypt_img_flatten)
decrypt_img = np.reshape(decrypt_img_flatten,img.shape)
cv2.imwrite("./playground/images/decrypt_image/newdecryptedimg1.png", decrypt_img)
