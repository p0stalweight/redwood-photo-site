// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/admin/login" page={AdminLoginPage} name="login" />
      <Private unauthenticated="home">
        <Route path="/admin/gallery-edit" page={AdminGalleryEditPage} name="galleryEdit" />
        <Route path="/admin/manage-galleries" page={AdminManageGalleriesPage} name="manageGalleries" />
        <Route
          path="/admin/gallery-upload"
          page={AdminGalleryUploadPage}
          name="galleryUpload"
        />
      </Private>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/galleries/{id:Int}" page={GalleryPage} name="gallery" />
      <Route
        path="/galleries/{galleryId:Int}/photos/{order:Int}"
        page={GalleryPhotoPage}
        name="galleryPhoto"
      />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
