import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lesson, LessonWithProgress } from "./types";

export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Fetch lessons and their progress
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .order('created_at');

        if (lessonsError) throw lessonsError;

        // Fetch progress for all lessons
        const { data: progressData, error: progressError } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        // Combine lessons with their progress
        const lessonsWithProgress = lessonsData.map((lesson: Lesson) => {
          const progress = progressData.find((p: any) => p.lesson_id === lesson.id);
          return {
            ...lesson,
            progress: progress ? {
              status: progress.status,
              time_spent: progress.time_spent,
              last_position: progress.last_position,
            } : {
              status: 'not_started' as const,
              time_spent: 0,
              last_position: 0,
            }
          };
        });

        return lessonsWithProgress;
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast.error('Failed to load lessons');
        throw error;
      }
    }
  });
};