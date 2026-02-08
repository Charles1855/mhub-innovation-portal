<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Models\Project;

/*
| Public Auth Routes
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
| Protected Routes
*/
Route::middleware(['auth:sanctum'])->group(function () {

    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // User projects
    Route::get('/projects', function () {
        return Project::where('user_id', auth()->id())->get();
    });

    Route::post('/projects', function (Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'phone' => 'required|string|max:20',
        ]);

        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'phone' => $request->phone,
            'user_id' => auth()->id(),
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Project submitted successfully', 'project' => $project]);
    });

    // Logout
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });

    // ✅ Admin routes
    Route::get('/admin/projects', function () {
        if (auth()->user()->role !== 'admin') abort(403);

        return Project::with('user')->get();
    });

    Route::post('/admin/projects/{id}/approve', function ($id) {
        if (auth()->user()->role !== 'admin') abort(403);

        $project = Project::findOrFail($id);
        $project->status = 'approved';
        $project->save();

        return response()->json(['message' => 'Project approved']);
    });

    Route::post('/admin/projects/{id}/reject', function ($id) {
        if (auth()->user()->role !== 'admin') abort(403);

        $project = Project::findOrFail($id);
        $project->status = 'rejected';
        $project->save();

        return response()->json(['message' => 'Project rejected']);
    });
});
