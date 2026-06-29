#!/usr/bin/env nu

# Vaked E2E Build & Deploy Engine
# Automates Tailwind CSS compilation, Hugging Face Space synchronization, and Git deployments.
def main [
    --push (-p)      # Automatically commit and push to GitHub and Hugging Face
    --message (-m): string = "chore: production build and deploy" # Commit message
] {
    let workspace_dir = "/Users/lodripeter/workspace/peterlodri-sec/proposal.vaked.dev"
    let hf_space_dir = "/Users/lodripeter/workspace/peterlodri-sec/kompress-playground-space"

    print $"(ansi cyan_bold)=== Vaked E2E Build Engine ===(ansi reset)"
    
    # 1. Compile Tailwind CSS
    print $"(ansi blue)[1/3] Compiling Tailwind v4 CSS... (ansi reset)"
    cd $workspace_dir
    let compile_res = (do { npm run build } | complete)
    if $compile_res.exit_code != 0 {
        print -e $"(ansi red_bold)Error: Tailwind compilation failed!(ansi reset)"
        print -e $compile_res.stderr
        exit 1
    }
    print $"(ansi green)✓ Tailwind compiled successfully.(ansi reset)"

    # 2. Sync to Hugging Face Space
    print $"(ansi blue)[2/3] Syncing assets to Hugging Face Space... (ansi reset)"
    if ($hf_space_dir | path exists) {
        let files_to_sync = ["index.html", "app.js", "index.css", "_headers", "reviews.json", "favicon.svg"]
        for file in $files_to_sync {
            let src = ($workspace_dir | path join $file)
            let dest = ($hf_space_dir | path join $file)
            if ($src | path exists) {
                cp $src $dest
                print $"(ansi -e '90m')  + Synced ($file)(ansi reset)"
            }
        }
        print $"(ansi green)✓ Assets synced successfully to ($hf_space_dir).(ansi reset)"
    } else {
        print $"(ansi yellow)Warning: Hugging Face Space directory ($hf_space_dir) not found. Skipping sync.(ansi reset)"
    }

    # 3. Git Commit and Push
    if $push {
        print $"(ansi blue)[3/3] Deploying to GitHub and Hugging Face... (ansi reset)"
        
        # GitHub Proposal Repo
        print $"(ansi -e '90m')  Pushing to GitHub [proposal.vaked.dev]...(ansi reset)"
        cd $workspace_dir
        git add .
        let git_status = (git status --porcelain)
        if ($git_status | is-empty) {
            print $"(ansi -e '90m')  No changes to commit on GitHub.(ansi reset)"
        } else {
            git commit -m $message
            git push origin main
            print $"(ansi green)  ✓ Pushed to GitHub.(ansi reset)"
        }

        # Hugging Face Space Repo
        if ($hf_space_dir | path exists) {
            let hf_token = ($env.HF_TOKEN? | default "")
            if ($hf_token | is-empty) {
                print $"(ansi yellow)Warning: HF_TOKEN environment variable not set. Skipping Hugging Face Space push.(ansi reset)"
            } else {
                print $"(ansi -e '90m')  Pushing to Hugging Face Space...(ansi reset)"
                cd $hf_space_dir
                git add .
                let hf_git_status = (git status --porcelain)
                if ($hf_git_status | is-empty) {
                    print $"(ansi -e '90m')  No changes to commit on Hugging Face.(ansi reset)"
                } else {
                    git commit -m $message
                    git push $"https://PeetPedro:($hf_token)@huggingface.co/spaces/PeetPedro/kompress-playground" main --force
                    print $"(ansi green)  ✓ Pushed to Hugging Face.(ansi reset)"
                }
            }
        }
        print $"(ansi green_bold)=== E2E Deployment Complete! ===(ansi reset)"
    } else {
        print $"(ansi yellow)[3/3] Skipped git push. Run with --push (-p) to deploy.(ansi reset)"
        print $"(ansi green_bold)=== Local Build Complete! ===(ansi reset)"
    }
}
