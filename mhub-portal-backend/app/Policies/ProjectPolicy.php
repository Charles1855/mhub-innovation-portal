<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Project;

class ProjectPolicy
{
    /**
     * Determine whether the user can approve or reject a project.
     */
    public function approve(User $user, Project $project)
    {
        return $user->role === 'admin';
    }
}
