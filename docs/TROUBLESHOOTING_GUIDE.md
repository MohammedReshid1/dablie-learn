# 🔧 Course Platform Troubleshooting Guide

## Overview
This guide addresses common loading issues in the DablieLearn platform and provides step-by-step solutions to resolve them.

---

## 🚨 Issue #1: Explore Page Showing "Loading Courses..."

### **Symptoms:**
- Page displays "Loading courses..." indefinitely
- No course cards appear
- Filter options may not work

### **Step-by-Step Debugging:**

#### **Level 1: Basic Checks**
1. **Refresh the page** (Ctrl+F5 or Cmd+Shift+R)
2. **Check internet connection** - Try loading other websites
3. **Wait 30 seconds** - Sometimes the initial load takes time
4. **Try a different browser** (Chrome, Firefox, Safari, Edge)

#### **Level 2: Browser Settings**
1. **Enable JavaScript:**
   - Chrome: Settings → Privacy & Security → Site Settings → JavaScript → Allowed
   - Firefox: about:config → javascript.enabled → true
   - Safari: Preferences → Security → Enable JavaScript

2. **Check Ad Blockers:**
   - Disable ad blockers temporarily
   - Add `localhost:5173` to whitelist
   - Common blockers: uBlock Origin, AdBlock Plus, Ghostery

3. **Browser Permissions:**
   - Allow cookies for the site
   - Enable local storage
   - Check if site is blocked in browser settings

#### **Level 3: Network & Cache**
1. **Clear Browser Cache:**
   ```
   Chrome: Ctrl+Shift+Delete → Select "All time" → Clear data
   Firefox: Ctrl+Shift+Delete → Select "Everything" → Clear Now
   Safari: Develop → Empty Caches
   ```

2. **Clear Site Data:**
   - Chrome: F12 → Application → Storage → Clear site data
   - Firefox: F12 → Storage → Clear All

3. **Check Network Tab:**
   - Open Developer Tools (F12)
   - Go to Network tab
   - Refresh page
   - Look for failed requests (red entries)
   - Check if API calls to Supabase are failing

#### **Level 4: Technical Solutions**
1. **Check Console Errors:**
   ```javascript
   // Open browser console (F12) and look for:
   - "Supabase request failed"
   - "Network error"
   - "CORS error"
   - "Authentication failed"
   ```

2. **Verify Environment Variables:**
   - Check if `.env` file exists
   - Ensure Supabase URL and keys are correct
   - Restart development server after changes

3. **Database Connection Test:**
   ```javascript
   // In browser console, test connection:
   console.log('Testing Supabase connection...');
   // Check if courses.getPublishedCourses() returns data
   ```

### **Common Causes:**
- **Supabase connection issues** (most common)
- **Missing environment variables**
- **Database permissions/RLS policies**
- **Network connectivity problems**
- **Browser compatibility issues**

### **Quick Fixes:**
1. **Hard refresh:** Ctrl+Shift+R
2. **Incognito mode:** Test in private browsing
3. **Different device:** Try mobile or tablet
4. **VPN/Proxy:** Disable if using one

---

## 🚨 Issue #2: Categories Page Displaying "Loading Categories..."

### **Symptoms:**
- Category cards don't appear
- "Loading categories..." text persists
- Navigation to category detail pages fails

### **Step-by-Step Debugging:**

#### **Level 1: Quick Fixes**
1. **Navigate directly:** Try `/categories/development` in URL
2. **Check other pages:** Test if other pages load correctly
3. **Browser back/forward:** Use navigation buttons
4. **Mobile test:** Check on mobile device

#### **Level 2: Data Verification**
1. **Check Database:**
   - Verify categories exist in Supabase dashboard
   - Ensure RLS policies allow reading
   - Check if category slugs are correct

2. **API Response Test:**
   ```javascript
   // In browser console:
   fetch('/api/categories')
     .then(r => r.json())
     .then(console.log)
     .catch(console.error);
   ```

#### **Level 3: Component-Specific Issues**
1. **React Router Issues:**
   - Check if routing is working
   - Verify component imports
   - Test direct URL access

2. **State Management:**
   - Check if loading state gets stuck
   - Verify error handling in components
   - Look for infinite loops in useEffect

### **Solutions:**
1. **Clear React state:** Refresh page completely
2. **Check route configuration:** Verify routing setup
3. **Database reseed:** Re-run migration scripts
4. **Component remount:** Navigate away and back

---

## 🚨 Issue #3: Dashboard Showing Infinite Loading

### **Symptoms:**
- Spinning loader never stops
- Dashboard content never appears
- User stats don't load
- "My Courses" section empty

### **Step-by-Step Debugging:**

#### **Level 1: Authentication Check**
1. **Verify Login Status:**
   - Check if you're actually logged in
   - Look for user avatar in header
   - Try logging out and back in

2. **Session Validation:**
   ```javascript
   // In console, check auth state:
   localStorage.getItem('supabase.auth.token')
   // Should return a valid JWT token
   ```

#### **Level 2: Permission Issues**
1. **Database Permissions:**
   - Check RLS policies for profiles table
   - Verify enrollment policies
   - Ensure user can read own data

2. **User Profile Check:**
   - Verify profile exists in database
   - Check if profile creation trigger worked
   - Manually create profile if missing

#### **Level 3: Data Dependencies**
1. **Enrollment Data:**
   - Check if user has any enrollments
   - Verify enrollment table structure
   - Test with sample enrollment data

2. **API Calls:**
   ```javascript
   // Test API endpoints:
   - /api/user/enrollments
   - /api/user/profile
   - /api/user/progress
   ```

### **Common Causes:**
- **Missing user profile** in database
- **RLS policy blocking data access**
- **Authentication token expired**
- **No enrollment data** to display

### **Solutions:**
1. **Re-authenticate:** Log out and log back in
2. **Profile creation:** Manually trigger profile creation
3. **Sample data:** Add test enrollments
4. **Permission fix:** Update RLS policies

---

## 🚨 Issue #4: My Courses Section Not Loading Content

### **Symptoms:**
- "No courses found" message
- Empty course grid
- Enrollment data missing
- Progress not showing

### **Step-by-Step Debugging:**

#### **Level 1: Data Verification**
1. **Check Enrollments:**
   - Verify user is enrolled in courses
   - Check enrollment table in database
   - Ensure course IDs are valid

2. **Course Availability:**
   - Verify courses are published
   - Check if courses still exist
   - Ensure proper course-enrollment linking

#### **Level 2: Database Queries**
1. **SQL Query Test:**
   ```sql
   -- Test enrollment query:
   SELECT e.*, c.title, c.image_url 
   FROM enrollments e 
   JOIN courses c ON e.course_id = c.id 
   WHERE e.student_id = 'user-id';
   ```

2. **RLS Policy Check:**
   - Verify student can read own enrollments
   - Check course visibility policies
   - Ensure proper JOIN permissions

#### **Level 3: Mock Data Solution**
1. **Add Test Enrollments:**
   ```sql
   INSERT INTO enrollments (student_id, course_id, progress)
   VALUES ('user-id', 'course-id', 25);
   ```

2. **Component Fallback:**
   - Implement mock data for testing
   - Add error boundaries
   - Provide sample course data

---

## 🛠️ General Troubleshooting Tools

### **Browser Developer Tools**
1. **Console Tab:** Check for JavaScript errors
2. **Network Tab:** Monitor API requests
3. **Application Tab:** Check local storage and cookies
4. **Sources Tab:** Debug JavaScript code

### **Required Browser Settings**
- **JavaScript:** Enabled
- **Cookies:** Allowed for localhost
- **Local Storage:** Enabled
- **Pop-ups:** Allowed (for auth)
- **Third-party cookies:** Enabled

### **Network Requirements**
- **Stable internet connection**
- **Access to supabase.co domain**
- **No corporate firewall blocking**
- **DNS resolution working**

### **Cache Clearing Instructions**

#### **Chrome:**
1. Press `Ctrl+Shift+Delete`
2. Select "All time"
3. Check all boxes
4. Click "Clear data"

#### **Firefox:**
1. Press `Ctrl+Shift+Delete`
2. Select "Everything"
3. Check all boxes
4. Click "Clear Now"

#### **Safari:**
1. Go to Develop menu
2. Click "Empty Caches"
3. Or use `Cmd+Option+E`

#### **Edge:**
1. Press `Ctrl+Shift+Delete`
2. Select "All time"
3. Check all boxes
4. Click "Clear now"

---

## 🔄 Alternative Access Methods

### **If Main Site Fails:**
1. **Direct URL Access:**
   - Try `/courses` directly
   - Use `/categories/development`
   - Access `/dashboard` via URL

2. **Mobile Browser:**
   - Test on phone/tablet
   - Use different mobile browser
   - Try mobile app if available

3. **Different Network:**
   - Switch to mobile data
   - Try different WiFi
   - Use VPN if needed

### **Backup Solutions:**
1. **Incognito/Private Mode**
2. **Different Browser**
3. **Guest User Account**
4. **Mobile Device**

---

## 📞 When to Contact Support

Contact support if you've tried all solutions and still experience:
- Persistent loading issues after 24 hours
- Error messages not covered in this guide
- Database connection failures
- Authentication problems
- Payment/enrollment issues

**Support Information:**
- Email: support@dablielearn.com
- Include: Browser version, error messages, steps tried
- Attach: Screenshots of error states

---

## ✅ Success Indicators

**Explore Page Working:**
- Course cards visible
- Filters functional
- Search working
- Course details accessible

**Categories Working:**
- Category cards displayed
- Navigation functional
- Course counts accurate
- Category pages load

**Dashboard Working:**
- User stats visible
- Course progress shown
- Recent activity displayed
- Navigation working

**My Courses Working:**
- Enrolled courses listed
- Progress bars accurate
- Course access functional
- Certificates available

---

*Last Updated: January 2025*
*Version: 1.0*