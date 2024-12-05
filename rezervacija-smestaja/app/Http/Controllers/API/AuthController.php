<?php
 
namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
 
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:8',
        ]);
 
        if ($validator->fails()) {
            return response()->json(['Registration failed', $validator->errors()]);
        }
 
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);
 
        $token = $user->createToken('auth_token')->plainTextToken;
 
        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }
 
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
 
        $user = User::where('email', $credentials['email'])->first();
 
        if ($user) {
 
            if (Hash::check($credentials['password'], $user->password)) {
 
                $token = $user->createToken('auth_token')->plainTextToken;
                $role = $user->role;
 
                $response = [
                    'user' => $user,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'role' => $role
                ];
 
                return response()->json($response, 201);
            } else {
                return response()->json(['message' => 'Wrong password'], 404);
            }
        } else {
            return response()->json(['message' => 'There is no user with this email address'], 404);
        }
    }
 
 
    public function logout(Request $request)
    {
        $user = $request->user();
 
        $user->tokens()->delete();
        return ['message' => 'You have successfully logged out'];
    }
}