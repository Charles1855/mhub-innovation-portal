<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class AdminProjectController extends Controller
{
    private function checkAdmin()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
    }

    // Admin → View ALL projects
    public function index()
    {
        $this->checkAdmin();

        return Project::with('user')->latest()->get();
    }

    // Admin → Approve
    public function approve($id)
    {
        $this->checkAdmin();

        $project = Project::findOrFail($id);
        $project->status = 'approved';
        $project->save();

        return response()->json(['message' => 'Project approved']);
    }

    // Admin → Reject
    public function reject($id)
    {
        $this->checkAdmin();

        $project = Project::findOrFail($id);
        $project->status = 'rejected';
        $project->save();

        return response()->json(['message' => 'Project rejected']);
    }
}
