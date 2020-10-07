// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/photos/new" page={NewPhotoPage} name="newPhoto" />
      <Route path="/photos/{id:Int}/edit" page={EditPhotoPage} name="editPhoto" />
      <Route path="/photos/{id:Int}" page={PhotoPage} name="photo" />
      <Route path="/photos" page={PhotosPage} name="photos" />
      <Route path="/galleries/new" page={NewGalleryPage} name="newGallery" />
      <Route path="/galleries/{id:Int}/edit" page={EditGalleryPage} name="editGallery" />
      <Route path="/galleries/{id:Int}" page={GalleryPage} name="gallery" />
      <Route path="/galleries" page={GalleriesPage} name="galleries" />
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
