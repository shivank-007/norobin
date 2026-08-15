import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type WorkforceRequest = {
  businessName?: string;
  industry?: string;
  website?: string;
  details?: string;
  selectedEmployee?: string | null;
  selectedNeeds?: string[];
  selectedChannels?: string[];
};

type WorkforceStatus = "NEW" | "IN_PROGRESS" | "COMPLETED";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toWorkforceBrief(row: any) {
  return {
    id: row.id,
    businessName: row.business_name,
    industry: row.industry,
    website: row.website,
    details: row.details,
    selectedEmployee: row.selected_employee,
    selectedNeeds: row.selected_needs ?? [],
    selectedChannels: row.selected_channels ?? [],
    status: row.status,
    createdAt: row.created_at,
  };
}

// GET /api/workforce
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("workforce_briefs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SUPABASE GET ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to load workforce briefs.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: (data ?? []).map(toWorkforceBrief),
    });
  } catch (error) {
    console.error("WORKFORCE GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load workforce briefs.",
      },
      { status: 500 }
    );
  }
}

// POST /api/workforce
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as WorkforceRequest;

    const {
      businessName,
      industry,
      website,
      details,
      selectedEmployee,
      selectedNeeds,
      selectedChannels,
    } = body;

    if (!businessName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Business name is required.",
        },
        { status: 400 }
      );
    }

    if (!industry?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Industry is required.",
        },
        { status: 400 }
      );
    }

    if (!selectedEmployee) {
      return NextResponse.json(
        {
          success: false,
          error: "An AI employee must be selected.",
        },
        { status: 400 }
      );
    }

    if (!selectedNeeds || selectedNeeds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one workflow must be selected.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("workforce_briefs")
      .insert({
        id: crypto.randomUUID(),
        business_name: businessName.trim(),
        industry: industry.trim(),
        website: website?.trim() || null,
        details: details?.trim() || null,
        selected_employee: selectedEmployee,
        selected_needs: selectedNeeds,
        selected_channels: selectedChannels ?? [],
        status: "NEW",
      })
      .select()
      .single();

    if (error) {
      console.error("SUPABASE POST ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to save workforce brief.",
        },
        { status: 500 }
      );
    }

    const workforceBrief = toWorkforceBrief(data);

    console.log(
      "WORKFORCE BRIEF SAVED TO SUPABASE:",
      workforceBrief
    );

    return NextResponse.json({
      success: true,
      message: "Workforce brief saved successfully.",
      data: workforceBrief,
    });
  } catch (error) {
    console.error("WORKFORCE POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save workforce brief.",
      },
      { status: 500 }
    );
  }
}

// PATCH /api/workforce
export async function PATCH(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = typeof body.id === "string" ? body.id : "";
    const status = body.status as WorkforceStatus;

    const allowedStatuses: WorkforceStatus[] = [
      "NEW",
      "IN_PROGRESS",
      "COMPLETED",
    ];

    if (!id || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid id or status.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("workforce_briefs")
      .update({
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE PATCH ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to update workforce status.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: toWorkforceBrief(data),
    });
  } catch (error) {
    console.error("WORKFORCE PATCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update workforce status.",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/workforce
export async function DELETE(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = typeof body.id === "string" ? body.id : "";

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID is required.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("workforce_briefs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("SUPABASE DELETE ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete workforce brief.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Workforce brief deleted.",
    });
  } catch (error) {
    console.error("WORKFORCE DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete workforce brief.",
      },
      { status: 500 }
    );
  }
}
