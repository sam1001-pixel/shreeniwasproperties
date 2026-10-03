import os
import re

def process_file(filepath, replacements):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        else:
            print(f"No changes made to {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# Admin Page
admin_replacements = [
    # Sidebar to Top/Side nav
    (r'w-64 bg-\[#0A1628\] text-white flex-shrink-0 fixed h-full z-10', r'w-full md:w-64 bg-[#0A1628] text-white flex-shrink-0 relative md:fixed h-auto md:h-full z-10'),
    (r'<nav className="space-y-2">', r'<nav className="flex overflow-x-auto no-scrollbar gap-2 border-b border-white/10 pb-2 md:space-y-2 md:flex-col md:overflow-visible md:border-none md:pb-0">'),
    (r'className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all', r'className={`whitespace-nowrap flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all'),
    (r'<div className="flex-1 ml-64">', r'<div className="flex-1 md:ml-64">'),
    # Header
    (r'bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm', r'bg-white border-b border-slate-200 h-auto py-4 px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between sticky top-0 z-10 shadow-sm'),
    # Tables
    (r'<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">', r'<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">'),
    # Form inputs font size
    (r'text-sm w-64', r'text-base sm:text-sm w-full sm:w-64'),
    (r'text-sm bg-white', r'text-base sm:text-sm bg-white'),
]

process_file('src/app/admin/page.tsx', admin_replacements)

# About Page
about_replacements = [
    (r'py-24 px-4', r'py-12 sm:py-20 px-4 sm:px-6 lg:px-8'),
    (r'grid grid-cols-2 md:grid-cols-4', r'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'),
    (r'grid md:grid-cols-2', r'grid grid-cols-1 md:grid-cols-2'),
]
process_file('src/app/about/page.tsx', about_replacements)

# Contact Page
contact_replacements = [
    (r'py-24 px-4', r'py-12 sm:py-20 px-4 sm:px-6 lg:px-8'),
    (r'text-sm', r'text-base sm:text-sm'),
    (r'grid md:grid-cols-2', r'grid grid-cols-1 md:grid-cols-2'),
]
process_file('src/app/contact/page.tsx', contact_replacements)

# Blog Page
blog_replacements = [
    (r'grid md:grid-cols-3', r'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'),
    (r'flex gap-4 mb-8', r'flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2'),
]
process_file('src/app/blog/page.tsx', blog_replacements)

# Blog Slug Page
blog_slug_replacements = [
    (r'h-\[400px\]', r'h-[280px] sm:h-[450px] md:h-[600px]'),
    (r'h-\[500px\]', r'h-[280px] sm:h-[450px] md:h-[600px]'),
    (r'flex flex-col gap-4', r'flex flex-row lg:flex-col gap-3 justify-center lg:justify-start'),
]
process_file('src/app/blog/[slug]/page.tsx', blog_slug_replacements)

# Auth Pages
auth_replacements = [
    (r'w-full max-w-md p-8', r'w-full max-w-md mx-4 p-6 sm:p-8 rounded-3xl'),
    (r'text-sm', r'text-base sm:text-sm'),
]
process_file('src/app/(auth)/login/page.tsx', auth_replacements)
process_file('src/app/(auth)/register/page.tsx', auth_replacements)

# Dashboard Property New
dashboard_replacements = [
    (r'flex justify-between mt-8', r'flex justify-between mt-8 fixed sm:static bottom-0 left-0 right-0 p-4 sm:p-0 bg-white sm:bg-transparent border-t sm:border-t-0 border-gray-200 z-50'),
    (r'flex space-x-4 mb-8', r'flex space-x-4 mb-8 overflow-x-auto no-scrollbar pb-2'),
]
process_file('src/app/dashboard/landlord/properties/new/page.tsx', dashboard_replacements)

