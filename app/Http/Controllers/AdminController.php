<?php

namespace QuestGen\Http\Controllers;
use Illuminate\Http\Request;
use QuestGen\User as User;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function index()
    {
    	return view('body.manage-admin');
    }
    public function view_deactivated()
    {
    	return view('body.restore-deactive-admin');
    }

    /*
	**@description : Create an admin
    */
    public function create()
    {
    	request()->validate([
    		'firstname'=>'required|string|max:100|regex:/(^[A-Za-z ]+$)+/',
    		'surname'=>'required|string|max:100|regex:/(^[A-Za-z ]+$)+/',
    		'email'=>'required|unique:users|email',
    		'password'=>'required|min:6|string|confirmed',
    		'role'=>'alpha|required',
    		'faculty_id'=>'integer|filled',
    		'department_id'=>'integer|filled',
    		'course_id'=>'integer|filled',
    		'avatar'=>'image|mimes:jpeg,png|max:100'
    	]);
    	$avatar_url = request()->hasFile('avatar') ? request()->avatar->store('public/avatar') : "/storage/avatar/myAvatar.png"  ;
    	$avatar_url = str_replace('public', '/storage', $avatar_url);
    	User::create([
    		'firstname'=>request()->firstname,
    		'surname'=>request()->surname,
    		'email'=>request()->email,
    		'password'=>bcrypt(request()->password),
    		'role'=>request()->role,
    		'faculty_id'=>request()->faculty_id,
    		'department_id'=>request()->department_id,
    		'course_id'=>request()->course_id,
    		'avatar'=>$avatar_url
    	]);
    	return response()->json('Successfull registration');
    }

    /*
	**@description : Search for admin
    */
    public function search()
    {
    	$search = request()->admin;
        $paginate = request()->paginate * 10;
        if(empty($search)){
            $admin = User::with(['departments','faculty','courses'])
            ->where('active',1)
            ->skip($paginate)
            ->take(10)
            ->orderBy('id','DESC')->get();    
        }
        else{
            $admin = User::with(['departments','faculty','courses'])
            ->where('active',1)
            ->where('firstname','LIKE',"%{$search}%")
            ->orWhere('surname','LIKE',"%{$search}%")
            ->skip($paginate)->take(10)->orderBy('id','DESC')->get();
        }
        return response()->json($admin);
    }

    /*
    **@description : Search for deactivated admin
    */
    public function search_deactivated()
    {
        $search = request()->admin;
        $paginate = request()->paginate * 10;
        if(empty($search)){
            $admin = User::with(['departments','faculty','courses'])
            ->where('active',0)
            ->skip($paginate)
            ->take(10)
            ->orderBy('id','DESC')->get();    
        }
        else{
            $admin = User::with(['departments','faculty','courses'])
            ->where('active',0)
            ->where('firstname','LIKE',"%{$search}%")
            ->orWhere('surname','LIKE',"%{$search}%")
            ->skip($paginate)->take(10)->orderBy('id','DESC')->get();
        }
        return response()->json($admin);
    }
    /*
	**@description : Update admin data
    */
    public function update($id)
    {
		request()->validate([
			'firstname'=>'required|string|max:100|regex:/(^[A-Za-z ]+$)+/',
    		'surname'=>'required|string|max:100|regex:/(^[A-Za-z ]+$)+/',
    		'email'=>'required|unique:users,email,'.$id.'|email'
		]);
		$user = User::find($id);
		$user->firstname = request()->firstname;
		$user->surname = request()->surname;
		$user->save();
		$success = 'Admin Data successfully updated'; 
		return response()->json($success);
    }

    /*
	**@description : Update admin Avatar
    */
    public function update_avatar($id)
    {
    	request()->validate([
    		'avatar'=>'image|mimes:jpeg,png|max:100'
		]);
		$user = User::find($id);
		if($user->avatar !==  '/storage/avatar/myAvatar.png'){
			$avatar = str_replace('storage', 'public', $user->avatar);
			Storage::delete($avatar);
		}
		$avatar_name = request()->avatar->store('public/avatar');
		$user->avatar = str_replace('public', '/storage', $avatar_name);
		$user->save();
		$success = 'Admin Data successfully updated'; 
		return response()->json($success);
    }

    /*
	**@description : Update admin role
    */
    public function update_role($id)
    {
    	request()->validate([
    		'role'=>'alpha|required',
    		'faculty_id'=>'integer|nullable',
    		'department_id'=>'integer|nullable',
    		'course_id'=>'integer|nullable',
		]);
		$user = User::find($id);
		$user->role = request()->role;
		$user->faculty_id = request()->faculty_id;
		$user->department_id = request()->department_id;
		$user->course_id = request()->course_id;
		$user->save();
		$success = 'Admin role successfully updated'; 
		return response()->json($success);
    }

    /*
	**@description : Update admin password
    */
    public function update_password($id)
    {
    	request()->validate([
    		'password'=>'required|min:6|string|confirmed'
		]);
		$user = User::find($id);
		$user->password = bcrypt(request()->password);
		$user->save();
		$success = 'Admin password successfully updated'; 
		return response()->json($success);
    }
    /*
	**@description : Deactivate admin
    */
    public function deactivate($id)
    {
		$user = User::find($id);
		$user->active = 0 ;
		$user->save();
		$success = 'Admin succesfully deactivated'; 
		return response()->json($success);
    }
    /*
    **@description : Activate admin
    */
    public function activate($id)
    {
        $user = User::find($id);
        $user->active = 1 ;
        $user->save();
        $success = 'Admin succesfully activated'; 
        return response()->json($success);
    }
}
