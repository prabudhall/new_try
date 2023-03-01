import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className=" justify-content-between align-items-center text-center py-3 my-4 border-top">
        <div className="col align-items-center text-center">
          
          <span className="text-muted text-center">© {new Date().getFullYear()} FoodBook, Inc</span>
        </div>

      </footer>
    </div>
  )
}
