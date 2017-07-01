defmodule Haypoll.Entry do
  use Haypoll.Web, :model

  schema "entries" do
    field :title, :string
    field :votes, :integer
    belongs_to :poll, Haypoll.Poll

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :votes])
    |> validate_required([:title, :votes])
  end
end
